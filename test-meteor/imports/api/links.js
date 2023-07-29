import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');
export const UserStateCollection = new Mongo.Collection('userState')