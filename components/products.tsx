"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"
import base64 from '../../assets/base64.jpeg'
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Toolbar,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiMenu, FiSearch, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  marginBottom: 3,
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
    cursor: "pointer",
  },
}));

const Products = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "Brandy",
    "Tequila",
    "Vodka",
    "Whisky",
    "Rum",
    "Gin",
    "Liqueurs",
  ];

  const products = [
    {
      id: 1,
      name: "Premium Whisky",
      category: "Whisky",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b",
    },
    {
      id: 2,
      name: "Smooth Vodka",
      category: "Vodka",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1621873495914-1c921811e37b",
    },
    {
      id: 3,
      name: "Aged Rum",
      category: "Rum",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b",
    },
    {
      id: 4,
      name: "Classic Gin",
      category: "Gin",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1621873495914-1c921811e37b",
    },
    {
      id: 5,
      name: "Silver Tequila",
      category: "Tequila",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b",
    },
    {
      id: 6,
      name: "Fine Brandy",
      category: "Brandy",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1621873495914-1c921811e37b",
    },
  ];

  const handleCategoryChange = (category: any) => {
    setSelectedCategories((prev: any) =>
      prev.includes(category)
        ? prev.filter((cat: any) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products
    .filter((product) =>
      searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((product) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(product.category)
        : true
    )
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") return a.price - b.price;
      if (sortBy === "priceHighToLow") return b.price - a.price;
      return 0;
    });

  const drawer = (
    <div className="flex">
        <Box sx={{ p: 2, width: "100%" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
            Categories
        </Typography>
        <FormGroup sx={{ flexDirection: "row" }}>
            {categories.map((category) => (
            <FormControlLabel
                key={category}
                control={
                <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                />
                }
                label={category}
            />
            ))}
        </FormGroup>
        </Box>
    </div>
  );

  return (
    <main className="w-full h-full flex overflow-auto">
        <Box sx={{ flexGrow: 1 }}>
        <Container sx={{ mt: 8, mb: 8 }}>
            {!isMobile && (
                <Grid item xs={12} sm={3}>
                {drawer}
                </Grid>
            )}
            <Grid item xs={12} sm={9}>
                <SearchWrapper sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                    startAdornment: <FiSearch />,
                    }}
                />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={(e) => setSortBy(e.target.value)}
                    >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
                    <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
                    </Select>
                </FormControl>
                </SearchWrapper>

                <div className='grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Link href={``}>
                  <div className='sm:col-span-2 col-span-2 text-[#212322] min-w-full overflow-hidden'>
                      <div className='overflow-hidden'>
                          <Image 
                          src={product.image} 
                          alt="" 
                          unoptimized 
                          priority 
                          placeholder='blur' 
                          blurDataURL={"https://firebasestorage.googleapis.com/v0/b/ubac-18e0d.appspot.com/o/base64.jpeg?alt=media&token=3cbefe48-0084-439e-8ce4-3e95fd466c74"}
                          loading="eager" 
                          width={300} 
                          height={300} 
                          className='w-full md:max-h-[400px] object-cover hover:scale-105 transform transition-transform ease-in-out duration-300 cursor-pointer'/>
                      </div>
                      <div className='pb-8 border-b'>
                          <div className='font-bold'>
                              <p className='uppercase text-[16px] mt-[16px]'>{product.name}</p>
                          </div>
                          <p className='text-gray-400 text-base text-[14px]'>{product.category}</p>
                          <p className='font-bold text-[16px] mt-0'>R{product.price.toFixed(2)}</p>
                      </div>
                  </div>
              </Link>
                    </Grid>
                ))}
                </div>
                </Grid>
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={Math.ceil(filteredProducts.length / 3)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
                </Box>
        </Container>

        <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
        >
            {drawer}
        </Drawer>
        </Box>
    </main>
  );
};

export default Products;
