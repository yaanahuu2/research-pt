import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DbInMemoryDataService implements InMemoryDbService {

  createDb() {
    const notes = [
      { id: 1, key: 'R4ZFM3UR', pageNum: 3, noteText: 'Colonial power shows itself in the actions of an administrator' },
      { id: 2, key: 'R4ZFM3UR', pageNum: 45, noteText: 'Crossing the river was a key point in the war. Rivers have a prominent place in all of these conflicts.' },
      { id: 3, key: 'R4ZFM3UR', pageNum: 34, noteText: 'Governor of BC turns a blind eye to the reasoning of the Tsilhqot\'in actors.' },
      { id: 4, key: 'R4ZFM3UR', pageNum: 77, noteText: 'Progress in negotiations.' },
      { id: 5, key: 'R4ZFM3UR', pageNum: 203, noteText: 'Execution of the chiefs.' },
      { id: 6, key: 'QTZWRE4H', pageNum: 56, noteText: 'Hudson\'s Bay\'s roots in white supremacy' },
      { id: 7, key: 'QTZWRE4H', pageNum: 66, noteText: 'Expropriation of Tsilhqot\'in Land.' },
      { id: 8, key: '5KPUTUBH', videoIn: 3, videoOut: 14, noteText: 'Starting the base of the basket.' },
      { id: 9, key: '5KPUTUBH', videoIn: 20, videoOut: 34, noteText: 'Bending around the corner.  Linda discusses the difficulty of this manoeuvre and the importance of learning how to do it properly.' }
    ];

    const albums = [
      { id: 1, name: 'Baskets', thumb_url: './assets/albums/basket1.jpg' },
      { id: 2, name: 'People', thumb_url: './assets/albums/people.jpg' },
      { id: 3, name: 'Housing', thumb_url: './assets/albums/housing.jpg' },
      { id: 4, name: 'Hunting', thumb_url: './assets/albums/hunting.jpg' },
      { id: 5, name: 'Food', thumb_url: './assets/albums/food.jpg' },
      { id: 6, name: 'Regalia', thumb_url: './assets/albums/regalia.jpg' },
      { id: 7, name: 'Places', thumb_url: './assets/albums/places.jpg' }
    ];

    const albumItems = [
      { id: 1, album_id: 2, name: 'people8', thumb_url: './assets/album_items/people8.jpg' },
      { id: 2, album_id: 4, name: 'hunting2', thumb_url: './assets/album_items/hunting2.jpg' },
      { id: 3, album_id: 6, name: 'regalia2', thumb_url: './assets/album_items/regalia2.jpg' },
      { id: 4, album_id: 6, name: 'regalia3', thumb_url: './assets/album_items/regalia3.jpg' },
      { id: 5, album_id: 2, name: 'people9', thumb_url: './assets/album_items/people9.jpg' },
      { id: 6, album_id: 6, name: 'regalia7', thumb_url: './assets/album_items/regalia7.jpg' },
      { id: 7, album_id: 6, name: 'regalia6', thumb_url: './assets/album_items/regalia6.jpg' },
      { id: 8, album_id: 6, name: 'regalia4', thumb_url: './assets/album_items/regalia4.jpg' },
      { id: 9, album_id: 6, name: 'regalia5', thumb_url: './assets/album_items/regalia5.jpg' },
      { id: 10, album_id: 7, name: 'places3', thumb_url: './assets/album_items/places3.jpg' },
      { id: 11, album_id: 7, name: 'places2', thumb_url: './assets/album_items/places2.jpg' },
      { id: 12, album_id: 7, name: 'places1', thumb_url: './assets/album_items/places1.jpg' },
      { id: 13, album_id: 5, name: 'food2', thumb_url: './assets/album_items/food2.jpg' },
      { id: 14, album_id: 7, name: 'places5', thumb_url: './assets/album_items/places5.jpg' },
      { id: 15, album_id: 7, name: 'places4', thumb_url: './assets/album_items/places4.jpg' },
      { id: 16, album_id: 5, name: 'food3', thumb_url: './assets/album_items/food3.jpg' },
      { id: 17, album_id: 4, name: 'hunting', thumb_url: './assets/album_items/hunting.jpg' },
      { id: 18, album_id: 5, name: 'food', thumb_url: './assets/album_items/food.jpg' },
      { id: 19, album_id: 6, name: 'regalia', thumb_url: './assets/album_items/regalia.jpg' },
      { id: 20, album_id: 2, name: 'people2', thumb_url: './assets/album_items/people2.jpg' },
      { id: 21, album_id: 1, name: 'basket2', thumb_url: './assets/album_items/basket2.jpg' },
      { id: 22, album_id: 1, name: 'basket3', thumb_url: './assets/album_items/basket3.jpg' },
      { id: 23, album_id: 2, name: 'people3', thumb_url: './assets/album_items/people3.jpg' },
      { id: 24, album_id: 1, name: 'basket1', thumb_url: './assets/album_items/basket1.jpg' },
      { id: 25, album_id: 3, name: 'housing', thumb_url: './assets/album_items/housing.jpg' },
      { id: 26, album_id: 2, name: 'people4', thumb_url: './assets/album_items/people4.jpg' },
      { id: 27, album_id: 1, name: 'basket4', thumb_url: './assets/album_items/basket4.jpg' },
      { id: 28, album_id: 2, name: 'people5', thumb_url: './assets/album_items/people5.jpg' },
      { id: 29, album_id: 2, name: 'people7', thumb_url: './assets/album_items/people7.jpg' },
      { id: 30, album_id: 3, name: 'housing2', thumb_url: './assets/album_items/housing2.jpg' },
      { id: 31, album_id: 2, name: 'people', thumb_url: './assets/album_items/people.jpg' },
      { id: 32, album_id: 2, name: 'people6', thumb_url: './assets/album_items/people6.jpg' }
    ];

    const categories = [
      { id: 1, cat_name: 'Makeup' },
      { id: 2, cat_name: 'Wardrobe' },
      { id: 3, cat_name: 'Location' },
      { id: 4, cat_name: 'Props' },
      { id: 5, cat_name: 'Script' },
      { id: 6, cat_name: 'Sound' },
      { id: 7, cat_name: 'Set Decoration' },
      { id: 8, cat_name: 'Baskets' },
      { id: 9, cat_name: 'Mocassins' },
      { id: 10, cat_name: 'Pit House' },
      { id: 11, cat_name: 'Tattoo' },
      { id: 12, cat_name: 'Knives' }
    ];

    const category_trees = [
      { id: 1, tree_name: 'Film' },
      { id: 2, tree_name: 'Community' }
    ];

    const category_relationships = [
      { id: 1, tree: 1, category: 1, parent: 0 },
      { id: 1, tree: 1, category: 2, parent: 0 },
      { id: 1, tree: 1, category: 3, parent: 0 },
      { id: 1, tree: 1, category: 4, parent: 0 },
      { id: 1, tree: 1, category: 5, parent: 0 },
      { id: 1, tree: 1, category: 6, parent: 0 },
      { id: 1, tree: 1, category: 7, parent: 0 },
      { id: 1, tree: 1, category: 8, parent: 4 },
      { id: 1, tree: 1, category: 9, parent: 4 },
      { id: 1, tree: 1, category: 10, parent: 7 },
      { id: 1, tree: 1, category: 11, parent: 1 },
      { id: 1, tree: 1, category: 12, parent: 4 }
    ];

    return {
      notes,
      albums,
      albumItems,
      categories,
      category_trees,
      category_relationships
    };
  }


  // Overrides the genId method to ensure that a note always has an id.
  // If the notes array is empty,
  // the method below returns the initial number (11).
  // if the notes array is not empty, the method below returns the highest
  // hero id + 1.
  // genId(notes: ZoteroItemNotes[]): number {
  //   return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 11;
  // }

}
