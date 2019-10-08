import {FormControl} from "@angular/forms";

export class OwnerValidator {

  static validOwner(fc: FormControl) {
    if(fc.value.toLowerCase() === "abc123" || fc.value.toLoserCase() === "123abc") {
      return({
        existingOwner: true,
      });
    } else {
      return null;
    }
  }
}
