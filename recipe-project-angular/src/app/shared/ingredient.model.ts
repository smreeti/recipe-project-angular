// we can get rid of the declaration and content in the body of the constructor like in
// RecipeModal by simply adding a access modifier in front of the property names.
export class Ingredient {
  constructor(public name: string, public amount: number) {
  }
}
