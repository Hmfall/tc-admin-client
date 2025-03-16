<template>
  <div class="editor-field">
    <div class="editor-field__container">
      <div class="editor-field__header d-flex align-center">
        <div class="editor-field__header-inner d-flex align-center">
          <label class="editor-field__label font-weight-medium">
            {{ label }}
          </label>

          <Transition>
            <div
              v-show="isToolbarVisible"
              class="editor-field__divider"
            >
              <v-divider
                class="editor-field__divider-icon"
                vertical
              />
            </div>
          </Transition>

          <Transition>
            <div
              v-show="isToolbarVisible"
              ref="toolbarContainer"
              class="editor-field__toolbar"
            >
              <button class="ql-bold" />
              <button class="ql-italic" />
              <button class="ql-underline" />
              <button class="ql-link" />
            </div>
          </Transition>
        </div>
      </div>
      <div
        class="editor-field__field"
        :style="{ minHeight: toPx(contentEditableContainerHeight) }"
      >
        <div
          ref="contentEditableContainer"
          class="editor-field__editable text-body-1"
        ></div>
        <div ref="hiddenInputContainer">
          <v-textarea
            v-model="quillRawValue"
            class="editor-field__hidden"
            :rows="rows"
            :rules="rules"
            :style="{ minHeight: toPx(hiddenInputHeight) }"
          />
        </div>
        <div
          ref="contentEditableContainerOutline"
          class="editor-field__outline"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onClickOutside,
  useEventListener,
  useFocusWithin,
  useMemoize,
  useMutationObserver,
  useResizeObserver,
} from '@vueuse/core';
import Quill from 'quill';
import type { EditedTextField } from '@/features/autoForm/model/types';

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    label?: string;
    rows?: string | number;
    rules?: EditedTextField['rules'];
  }>(),
  {
    rows: 1,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

let quill: Quill | null = null;

const isToolbarVisible = ref(false);
const isTooltipVisible = ref(false);

const quillRawValue = ref<string>();

const toolbarContainer = ref<HTMLElement | null>(null);
const contentEditableContainer = ref<HTMLElement | null>(null);
const hiddenInputContainer = ref<HTMLElement | null>(null);

const layoutCfg = {
  lineHeight: 24,
  inputYPadding: 8,
  inputHideDetailsHeight: 24,
};

const contentEditableContainerHeight = computed(
  () => +props.rows * layoutCfg.lineHeight + layoutCfg.inputYPadding * 2,
);

const hiddenInputInitHeight = ref(
  contentEditableContainerHeight.value + layoutCfg.inputHideDetailsHeight,
);

const hiddenInputHeight = computed({
  get() {
    return hiddenInputInitHeight.value;
  },
  set(value) {
    hiddenInputInitHeight.value = value + layoutCfg.inputHideDetailsHeight;
  },
});

const { focused: focusedContentEditableContainer } = useFocusWithin(contentEditableContainer);

const onHiddenInputContainerFocus = {
  in: () => hiddenInputContainer.value?.classList.add('editor-field--focused'),
  out: () => hiddenInputContainer.value?.classList.remove('editor-field--focused'),
};

const onMouseDown = (event: MouseEvent) => {
  if (contentEditableContainer.value?.contains(event.target as Node)) {
    isToolbarVisible.value = true;
    onHiddenInputContainerFocus.in();
  }
};

const onFocusOut = (event: FocusEvent) => {
  const relatedTarget = event.relatedTarget as Node;

  if (
    !contentEditableContainer.value?.contains(relatedTarget) &&
    !toolbarContainer.value?.contains(relatedTarget) &&
    !isTooltipVisible.value
  ) {
    isToolbarVisible.value = false;
  }
};

onClickOutside(
  contentEditableContainer,
  () => {
    onHiddenInputContainerFocus.out();
  },
  {
    ignore: [toolbarContainer],
  },
);

useResizeObserver(contentEditableContainer, (entries) => {
  const [entry] = entries;
  const { height } = entry.contentRect;
  hiddenInputHeight.value = height;
});

const onTextChange = () => {
  if (quill) {
    emit('update:modelValue', quill.getSemanticHTML());
  }
};

const toPx = useMemoize((value: number) => `${value}px`);

const setupQuill = () => {
  if (contentEditableContainer.value && toolbarContainer.value) {
    quill = new Quill(contentEditableContainer.value, {
      modules: {
        toolbar: toolbarContainer.value,
      },
      theme: 'snow',
    });

    if (props.modelValue) {
      quill.setContents(quill.clipboard.convert({ html: props.modelValue }), 'silent');
    }

    const qlEditor: HTMLElement | null = contentEditableContainer.value.querySelector('.ql-editor');

    if (qlEditor) {
      qlEditor.style.minHeight = toPx(contentEditableContainerHeight.value);
      quill.on('text-change', onTextChange);
    }
  }
};

const offQuill = () => {
  quill?.off('text-change', onTextChange);
};

const setupTooltipMutationObserver = () => {
  if (contentEditableContainer.value) {
    useMutationObserver(
      contentEditableContainer,
      () => {
        isTooltipVisible.value = !!contentEditableContainer.value?.querySelectorAll(
          '.ql-tooltip:not(.ql-hidden)',
        ).length;
      },
      {
        subtree: true,
        attributeFilter: ['class'],
      },
    );
  }
};

const setupQuillRawValue = () => {
  watch(
    () => props.modelValue,
    () => {
      quillRawValue.value = quill?.getText()?.replace(/\n/g, '');
    },
    {
      immediate: true,
    },
  );
};

watch(isTooltipVisible, (visible) => {
  if (!visible && !focusedContentEditableContainer.value) {
    isToolbarVisible.value = false;
    onHiddenInputContainerFocus.out();
  }
});

useEventListener(document, 'mousedown', onMouseDown);
useEventListener(document, 'focusout', onFocusOut);

onMounted(() => {
  setupQuill();
  setupQuillRawValue();
  setupTooltipMutationObserver();
});

onUnmounted(() => {
  offQuill();
});
</script>

<style scoped lang="scss">
@import '@/shared/assets/styles/colors';

.editor-field {
  &__header {
    height: 2rem;
  }

  &__label {
    font-size: 0.875rem;
  }

  &__divider {
    height: 100%;
  }

  &__divider-icon {
    padding: 0 6px;
    height: 16px;
  }

  &__hidden {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    :deep(.v-input__details) {
      height: 24px;
    }

    :deep(.v-input__control) {
      display: flex;
      flex: 1 0 auto;
    }

    :deep(.v-field__input) {
      padding: 0;
      min-height: 0;
    }

    :deep(textarea) {
      visibility: hidden;
    }
  }

  &__field {
    position: relative;
    font-size: 1rem;
    min-height: 40px;
  }

  &__toolbar {
    padding: 0 6px;
    border: none;
  }

  &__editable {
    border: none;

    &:hover {
      + div :deep(.v-field__outline) {
        --v-field-border-opacity: 1;
      }
    }
  }

  &--focused {
    :deep(.v-field__outline) {
      --v-field-border-width: 2px;
      --v-field-border-opacity: 1;
    }
  }
}

:deep(.ql-editor) {
  height: 100%;
  padding: 8px 16px;
  font-size: 1rem;
  line-height: 1.5;
}

:deep(.ql-snow a) {
  color: $color-primary;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
