# 2Tree

With this package you can easily transform any arrays into trees.

## Usage

You need to do three thins:

1. Create a class ("product") instances of which will be used as tree items. This call must have a `children` property.
2. Create a class that inherits `TreeMaker` and implement `rawToProduct()`, `isContainer()` and `isChild()` method.
3. Create an instance of your "maker" class and call `make()` method.

That's all!
You will get your tree in result!

## Example

Let's say we want to make a tree from the following array:

```json
[
    {
        "id": 1,
        "value": "Value 1"
    },
    {
        "id": 2,
        "value": "Value 2",
        "parent": 1
    },
    {
        "id": 3,
        "value": "Value 3"
    }
]
```

Firstly, we create a class to represent tree items:

```typescript
class MyItem
{
    id: number;
    value: string;
    children: MyItem[];
}
```

Secondly, we need to create a maker class:

```typescript
import TreeMaker from "2tree";

// ... MyItem class ...

class MyTreeMaker extends TreeMaker<any, MyItem>
{
    rawToProduct(raw: any): MyItem
    {
        let myItem = new MyItem;
            myItem.id = raw.id;
            myItem.value = raw.value;
        
        return myItem;
    }

    isContainer(raw: any)
    {
        return true;
    }

    isChild(raw: any, container: any)
    {
        return raw['parent'] === container['id'];
    }
}
```
Finally, let's make a tree:

```typescript
let maker = new MyTreeMaker;

console.log(maker.make(json));
```

## Limitation

Currenlty you can only select children consequentially.
Returning `false` in `isChild()` method will close current container.
I looking for a way select children anywhere in raw array.