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
import * as about from '@/pages/home/domain/sections/about';
import * as contacts from '@/pages/home/domain/sections/contacts';
import * as events from '@/pages/home/domain/sections/events';
import * as gallery from '@/pages/home/domain/sections/gallery';
import * as partners from '@/pages/home/domain/sections/partners';
import * as socials from '@/pages/home/domain/sections/socials';
import type { RouteSection } from '@/pages/home/types';

export const routeSections: RouteSection[] = [
  {
    title: 'Об объединении',
    path: '/about',
    model: About,
    store: aboutStore,
    formBuilder: about.aboutFormBuilder,
    templateBuilder: about.aboutTemplateBuilder,
    singleton: true,
  },
  {
    title: 'Проводимые мероприятия',
    path: '/events',
    model: Event,
    store: eventStore,
    formBuilder: events.eventsFormBuilder,
    templateBuilder: events.eventsTemplateBuilder,
  },
  {
    title: 'Галерея',
    path: '/gallery',
    model: Gallery,
    store: galleryStore,
    formBuilder: gallery.galleryFormBuilder,
    templateBuilder: gallery.galleryTemplateBuilder,
  },
  {
    title: 'Патрнёры/спонсоры',
    path: '/partners',
    model: Partner,
    store: partnerStore,
    formBuilder: partners.partnersFormBuilder,
    templateBuilder: partners.partnersTemplateBuilder,
  },
  {
    title: 'Социальные сети',
    path: '/social',
    model: Social,
    store: socialStore,
    formBuilder: socials.socialsFormBuilder,
    templateBuilder: socials.socialsTemplateBuilder,
  },
  {
    title: 'Контакты',
    path: '/contacts',
    model: Contact,
    store: contactStore,
    formBuilder: contacts.contactsFormBuilder,
    templateBuilder: contacts.eventsTemplateBuilder,
  },
];
