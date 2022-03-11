const PixelShopPage = () => {
    return <div>Pixel shop</div>
}
export const getServerSideProps = () =>{
    console.log("PixelShopPage getServerSideProps");
    return {
        props: {}
    }
}
export default PixelShopPage;