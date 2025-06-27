"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

function ItemCount({ count, name }: { count: number; name: string }) {
  return (
    <div key={name}>
      {name} count: {count}
    </div>
  );
}

function AddItemButton({
  name,
  description,
  addToCartFn,
}: {
  name: string;
  description: string;
  addToCartFn: (name: string) => void;
}) {
  return (
    <button
      className={styles.card}
      onClick={() => addToCartFn(name)}
      aria-label="Add to basket"
    >
      <h2>
        {name} <span>-&gt;</span>
      </h2>
      <p>{description}</p>
    </button>
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
        {itemInfo.map((item) => (
          <AddItemButton
            key={item.name}
            name={item.name}
            description={item.description}
            addToCartFn={addToCart}
          />
        ))}
      </div>
    </main>
  );
}
