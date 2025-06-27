"use client";
import { useState } from "react";
import styles from "./page.module.css";

function ItemCount({ count, name }: { count: number; name: string }) {
  return (
    <div key={name}>
      {name} count: {count}
    </div>
  );
}

export default function Home() {
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const [itemCounts, setItemCounts] = useState<number>(0);

  const itemInfo: { name: string; description: string }[] = [
    { name: "Item 1", description: "Foo" },
    { name: "Item 2", description: "Bar" },
    { name: "Item 3", description: "Baz" },
    { name: "Item 4", description: "Qux" },
  ];

  const addToCart = (product: string) => {
    let alreadyInCart = false;
    const newItems = items.map((item) => {
      if (item.name === product) {
        alreadyInCart = true;
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    if (!alreadyInCart) {
      newItems.push({ name: product, quantity: 1 });
    }
    setItems(newItems);
  };

  useEffect(() => {
    setItemCounts(items.reduce((acc, item) => acc + item.quantity, 0));
  }, [items]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <div>
          <button className={styles.basket}>
            Basket: {itemCounts} {itemCounts === 1 ? "item" : "items"}
          </button>
          {itemInfo.map((item) => (
            <ItemCount
              key={item.name}
              name={item.name}
              count={
                items.find((item) => item.name === item.name)?.quantity || 0
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        <button
          className={styles.card}
          onClick={() => addToCart("Item 1")}
          aria-label="Add to basket"
        >
          <h2>
            Item 1 <span>-&gt;</span>
          </h2>
          <p>Foo</p>
        </button>
        <button
          className={styles.card}
          onClick={() => addToCart("Item 2")}
          aria-label="Add to basket"
        >
          <h2>
            Item 2 <span>-&gt;</span>
          </h2>
          <p>Bar</p>
        </button>
        <button
          className={styles.card}
          onClick={() => addToCart("Item 3")}
          aria-label="Add to basket"
        >
          <h2>
            Item 3 <span>-&gt;</span>
          </h2>
          <p>Baz</p>
        </button>
        <button
          className={styles.card}
          onClick={() => addToCart("Item 4")}
          aria-label="Add to basket"
        >
          <h2>
            Item 4 <span>-&gt;</span>
          </h2>
          <p>Qux</p>
        </button>
      </div>
    </main>
  );
}
