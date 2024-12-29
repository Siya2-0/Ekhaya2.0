{/* <div className='grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
{filteredItems.map((item: InventoryItem) => (
    <Grid item xs={12} sm={6} md={4} key={item.id}>
<Link href={``}>
  <div className='sm:col-span-2 col-span-2 text-[#212322] min-w-full overflow-hidden'>
      <div className='overflow-hidden'>
          <Image 
          src={item.Image_url} 
          alt="" 
          unoptimized 
          priority 
          placeholder='blur' 
          blurDataURL={"https://firebasestorage.googleapis.com/v0/b/ubac-18e0d.appspot.com/o/base64.jpeg?alt=media&token=3cbefe48-0084-439e-8ce4-3e95fd466c74"}
          loading="eager" 
          width={300} 
          height={300} 
          className='w-full md:max-h-[250px] object-cover hover:scale-105 transform transition-transform ease-in-out duration-300 cursor-pointer'/>
      </div>
      <div className="pb-8 border-b relative">
        <div className="font-bold">
          <p className="uppercase text-[16px] mt-[16px]">{item.item_name}</p>
        </div>
        
        <p className="text-gray-400 text-base text-[14px]">{item.category}</p>
        
        <p className="font-bold text-[16px] mt-0">R{item.price.toFixed(2)}</p>
        
        <button
          onClick={() => addToOrders(item)}
          className="absolute bottom-8 right-2 bg-[#D62929] text-[#f2f2f2] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Add to Orders
        </button>
      </div>

  </div>
</Link>
    </Grid>
))}
</div> */}