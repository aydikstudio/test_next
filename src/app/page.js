import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Goods from "./goods";


export const metadata = {
  title: "Shop",
  desc: "Shop Shop"
}


async function getItems(size) {
  const res = await fetch('http://o-complex.com:1337/products?page=1&page_size='+size, {
    next: {
      revalidate: 10
    }
  });

  return res.json();
}


export default async function Home() {

  let size = 10;

  const items = await getItems(size);

 

  return (
      <Goods  goods={items}/>
  );
}
