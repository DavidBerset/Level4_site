/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: avisclients
 * Interface for AvisClients
 */
export interface AvisClients {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  eventType?: string;
  /** @wixFieldType text */
  reviewText?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType date */
  dateOfReview?: Date | string;
}


/**
 * Collection ID: matriellalocation
 * Interface for Matriellalocation
 */
export interface Matriellalocation {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  brand?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  equipmentImage?: string;
  /** @wixFieldType number */
  pricePerDay?: number;
}


/**
 * Collection ID: packstarifaires
 * Interface for PacksTarifaires
 */
export interface PacksTarifaires {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  packName?: string;
  /** @wixFieldType number */
  startingPrice?: number;
  /** @wixFieldType number */
  maxAudience?: number;
  /** @wixFieldType text */
  includedContent?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: ralisations
 * Interface for Ralisations
 */
export interface Ralisations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType image */
  eventPhoto?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType number */
  audienceSize?: number;
  /** @wixFieldType text */
  systemUsed?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType image */
  icon?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  callToActionText?: string;
  /** @wixFieldType url */
  callToActionLink?: string;
}
