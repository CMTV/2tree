interface IHasChildren<T extends IHasChildren<T>>
{
    children: T[]
}

export default abstract class TreeMaker<TRaw, TProduct extends IHasChildren<TProduct>>
{
    abstract rawToProduct(raw: TRaw): TProduct;
    abstract isContainer(raw: TRaw): boolean;
    abstract isChild(raw: TRaw, container: TRaw): boolean;

    make(rawArr: TRaw[]): TProduct[]
    {
        let products: TProduct[] = [];

        let container: TRaw;
        let children: TRaw[];

        let resetContainer = () => { container = null; children = []; }
        let closeContainer = () =>
        {
            if (container)
            {
                let containerProduct = this.rawToProduct(container);
                    containerProduct.children = children.length > 0 ? this.make(children) : null;
            
                products.push(containerProduct);
            }

            resetContainer();
        }

        resetContainer();

        let i = 0;
        while (i < rawArr.length)
        {
            let raw = rawArr[i];
            let product = this.rawToProduct(raw);

            if (product === null)
            {
                i++;
                continue;
            }

            if (!container)
            {
                if (this.isContainer(raw))
                    container = raw;
                else
                    products.push(product);
            }
            else
            {
                if (this.isChild(raw, container))
                {
                    children.push(raw);
                }
                else
                {
                    closeContainer();
                    i--;
                }
            }

            i++;
        }

        closeContainer();

        return products;
    }
}