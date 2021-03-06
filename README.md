# ng-only-number
Angular directive to restrict input to only allow numbers in textbox while typing along with additional options to limit no of digits before and after decimal point.

# How to use
In your angular app add **ngOnlyNumberApp** as a dependency.
Add the directive **ng-only-number** as an attribute to an input textbox.

### Example
```html
<input type="text" ng-only-number>
```

You can limit the number of digits before decimal point using **data-max-length**. If not specified it will allow any number of digits before decimal point.

### Example
```html
<input type="text" ng-only-number data-max-length=3>
```

For limiting number of digits after decimal point you can use attribute **data-max-decimal-points**. If not specified it will allow any number of digits after decimal point.

### Example
```html
<input type="text" ng-only-number data-max-decimal-points=1>
```