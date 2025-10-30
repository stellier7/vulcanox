export type HeroMediaMode = 'video' | 'image';

export const siteConfig = {
  heroMedia: (process.env.HERO_MEDIA as HeroMediaMode) || 'video',
  contactTo: process.env.CONTACT_TO || ''
};


