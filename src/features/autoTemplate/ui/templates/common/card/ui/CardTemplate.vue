<template>
  <v-card
    rounded="0"
    class="bg-transparent"
    :min-height="200"
  >
    <div class="d-flex flex-column flex-md-row ga-6">
      <template v-if="$slots.img">
        <v-container
          :width="layoutCfg.containerWidthPx"
          :max-width="layoutCfg.containerWidthPx"
        >
          <v-sheet :height="layoutCfg.imgHeightPx">
            <slot name="img" />
          </v-sheet>
        </v-container>
      </template>

      <template v-else-if="$slots.topImg && $slots.bottomImg">
        <v-container
          :width="layoutCfg.containerWidthPx"
          :max-width="layoutCfg.containerWidthPx"
        >
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="12">
                  <v-sheet :height="layoutCfg.cropedImgHeightPx">
                    <slot name="topImg" />
                  </v-sheet>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-sheet :height="layoutCfg.imgHeightPx">
                    <slot name="bottomImg" />
                  </v-sheet>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <div class="content-container d-flex flex-1-1-100 flex-column flex-md-row ga-0 ga-md-2">
        <div class="content-buttons-container d-flex flex-column flex-1-1-100">
          <div
            v-if="$slots.title"
            class="title text-h6 mb-2"
          >
            <slot name="title" />
          </div>

          <div
            v-if="$slots.subtitle"
            :class="['mb-4', $slots.text ? 'subtitle' : 'subtitle--expanded']"
          >
            <slot name="subtitle" />
          </div>

          <div
            v-if="$slots.text"
            class="text mb-3"
          >
            <slot name="text" />
          </div>

          <div
            v-if="$slots.url"
            class="url"
          >
            <slot name="url" />
          </div>

          <div
            v-if="eventModelGuard(value) && value.position"
            class="text-body-2"
          >
            <span class="font-weight-medium">Расположение:</span>&nbsp;<span
              class="text-decoration-underline"
            >
              {{ eventsLayoutPositionsMap.get(value.position)?.name }}
            </span>
          </div>
        </div>

        <div class="d-flex flex-md-column ga-1">
          <v-btn
            class="mb-1"
            icon="$mdiSquareEditOutline"
            variant="text"
            density="default"
            color="secondary"
            @click="emit('update')"
          />

          <v-btn
            v-if="!value.$config.singleton"
            icon="$mdiDeleteOutline"
            variant="text"
            density="default"
            color="secondary"
            @click="emit('delete')"
          />

          <v-btn
            v-if="value.ID"
            icon="$mdiArrowULeftBottom"
            variant="text"
            density="default"
            color="secondary"
            :disabled="!value.hasDiff"
            @click="emit('reset')"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts" generic="T extends Model">
import { eventsLayoutPositionsMap } from '@/pages/events/constants';
import type { ModelTemplateEmit } from '@/features/autoTemplate/model/types';
import { eventModelGuard } from '@/entities/event/utils';
import type { Model } from '@/shared/lib/storeFactory';

defineProps<{
  value: T;
}>();

const emit = defineEmits<ModelTemplateEmit>();

const layoutCfg = {
  containerWidthPx: 200,
  imgHeightPx: 200,
  cropedImgHeightPx: 70,
  paddingPx: 6,
  gap: 2,
};
</script>

<style scoped lang="scss">
@import '@/shared/assets/styles/mixins';
@import '@/shared/assets/styles/colors';

.v-container {
  padding: 0;

  .v-row {
    margin: -6px;

    + .v-row {
      margin-top: 6px;
    }
  }

  .v-col {
    padding: 6px;
  }
}

.content-container,
.content-buttons-container {
  min-width: 0;
}

:deep(.v-img) {
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.subtitle {
  @include wordWrap;
  line-clamp: 3;
  -webkit-line-clamp: 3;

  &--expanded {
    @include wordWrap;
    line-clamp: 5;
    -webkit-line-clamp: 5;
  }
}

.text {
  @include wordWrap;
  line-clamp: 5;
  -webkit-line-clamp: 5;
}

.url {
  @include wordWrap;
  line-clamp: 1;

  :deep(.render-slot) {
    text-decoration: underline;
  }
}

:deep(.render-slot a) {
  color: #1f75cb;
  text-decoration: underline;
}

.title,
.subtitle,
.text {
  :deep(a) {
    @include link;
  }
}
</style>
