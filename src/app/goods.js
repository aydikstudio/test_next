'use client';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const LocalStorageGet= typeof window !== 'undefined' ? localStorage.getItem('basket') : null

const LocalStorageSet  = (basket) => typeof window !== 'undefined' ? localStorage.setItem('basket', basket) : null

export default  function Goods({goods}) {

    
    const [basket, setBasket] = useState(JSON.parse(LocalStorageGet) || []);

 

    useEffect(() => {
        LocalStorageSet(JSON.stringify(basket));
    }, [basket])

    const addBasket = (item) => {
        item.count = 1;

        setBasket([...basket, item])
    } 


    const calculate = (id, type) => {
        let new_goods = [...basket];
        if(type == 'plus') {
          
            new_goods = new_goods.map((item) => {
                if(item.id == id) {
                    item.count++;
                }

                return item;
            })

            
        }

        if(type == 'minus') {
            new_goods = new_goods.map((item) => {
                if(item.id == id) {
                    item.count--;
                }

              
                    return item;
                
                
            })
        }

        setBasket([...new_goods.filter((item) => item.count > 0)]);
    }


    const onChangeCount = (count, id) => {
        let new_goods = [...basket];

        new_goods = new_goods = new_goods.map((item) => {
            if(item.id == id) {
                item.count = count;
            }

          
                return item;
            
            
        })

        setBasket([...new_goods.filter((item) => item.count > 0)]);
    }


    const clear = () => {
        typeof window !== 'undefined' ? localStorage.clear() : null
        setBasket([]);
    }
 
  
  return (
    <main>
      <Container>

        <Box className="added mx-auto text-left p-1  border-2">
          <Typography>Добавленные товары</Typography>
          <Box className="mt-2">
            
                {basket.length > 0 ? (
                    <>
                    {basket.map((item) => {
                        return (
                            <>
                          
                         <Box className="flex justify-start mt-2">
                                <Typography className="text-sm">{item.title.substr(0, 5)}</Typography>
                            <Box className="ml-20 flex justify-between"><Typography className="text-sm">{item.count} шт</Typography> <Typography className="text-sm ml-2">{item.count * item.price} руб.</Typography></Box>
                            </Box>
                            </>
                        )
                    })}
                
                    </>
                ):"No goods"}
              
           
            <Box className="mt-2 flex justify-start ">
              <Box>
                <input className="added-input"/>
              </Box>
              <Box className="flex flex-col">
              <Box>
                <Button className="added-button" variant="contained">Заказать</Button>
             
              </Box>
              <Box>
              <Button onClick={() =>clear()}>Очистить</Button>
              </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} className="mt-10">
          <Grid container spacing={2}>
            {goods.products.length >0 ? 
                goods.products.map((item) => (
                    <Grid item xs={3}>
                          {console.log(item)}
                    <Card className="block">
                      <CardMedia
                        sx={{ height: 200 }}
                        image={item.image_url}
                       
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" className="text-center block-name">
                        {item.title.substr(0, 5)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {item.description.substr(0, 15)}
                        </Typography>
                        <Typography component="div" className="block-name text-center mt-10">
                          цена: {item.price} руб.
                        </Typography>
                      </CardContent>
                      <CardActions>
                        {basket.some((item1) => item1.id == item.id) ? ( <Box className="flex justify-between mx-auto">
                        <Button onClick={() => calculate(item.id, 'minus')} variant="contained" className="block-buttons"> -</Button>
                        <input  onChange={(e) => onChangeCount(e.target.value, item.id)} className="block-input" value={basket.find((item1) => item1.id == item.id).count}/>
                        <Button variant="contained" className="block-buttons"
                        onClick={() => calculate(item.id, 'plus')}
                        >+</Button>
                        </Box>) : <Button onClick={() => addBasket(item)} variant="filled" className="block-button">Купить</Button>}
                        

                       
                      </CardActions>
                    </Card>
                  </Grid>
                ))
                
             : "No goods"}
           

          </Grid>
        </Box>

       

      </Container>
    </main>
  );
}
