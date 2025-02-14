import { About } from '@/entities/about/model/About';
import { aboutStore } from '@/entities/about/store/aboutStore';
import { Contact } from '@/entities/contact/model/Contact';
import { contactStore } from '@/entities/contact/store/contactStore';
import { Event } from '@/entities/event/model/Event';
import { eventStore } from '@/entities/event/store/eventStore';
import { Gallery } from '@/entities/gallery/model/Gallery';
import { galleryStore } from '@/entities/gallery/store/galleryStore';
import { Partner } from '@/entities/partner/model/Partner';
import { partnerStore } from '@/entities/partner/store/partnerStore';
import { Social } from '@/entities/social/model/Social';
import { socialStore } from '@/entities/social/store/socialStore';
import * as about from '@/pages/section/domain/builder/about';
import * as contacts from '@/pages/section/domain/builder/contacts';
import * as events from '@/pages/section/domain/builder/events';
import * as gallery from '@/pages/section/domain/builder/gallery';
import * as partners from '@/pages/section/domain/builder/partners';
import * as socials from '@/pages/section/domain/builder/socials';
import type { CommonRouteSection } from '@/pages/section/types';

export const routeSections: CommonRouteSection[] = [
  {
    routeName: 'about',
    title: 'Об объединении',
    model: About,
    store: aboutStore,
    formFields: about.aboutFormFields,
    templateSlots: about.aboutTemplateSlots,
    singleton: true,
  },
  {
    routeName: 'events',
    title: 'Проводимые мероприятия',
    model: Event,
    store: eventStore,
    formFields: events.eventsFormFields,
    templateSlots: events.eventsTemplateSlots,
  },
  {
    routeName: 'gallery',
    title: 'Галерея',
    model: Gallery,
    store: galleryStore,
    formFields: gallery.galleryFormFields,
    templateSlots: gallery.galleryTemplateSlots,
  },
  {
    routeName: 'partners',
    title: 'Патрнёры/спонсоры',
    model: Partner,
    store: partnerStore,
    formFields: partners.partnersFormFields,
    templateSlots: partners.partnersTemplateSlots,
  },
  {
    routeName: 'social',
    title: 'Социальные сети',
    model: Social,
    store: socialStore,
    formFields: socials.socialsFormFields,
    templateSlots: socials.socialsTemplateSlots,
  },
  {
    routeName: 'contacts',
    title: 'Контакты',
    model: Contact,
    store: contactStore,
    formFields: contacts.contactsFormFields,
    templateSlots: contacts.eventsTemplateSlots,
  },
];
