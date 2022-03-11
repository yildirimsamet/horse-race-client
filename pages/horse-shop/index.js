const HorseShopPage = () => {
    return <div>Horse shop</div>
}
export const getServerSideProps = () =>{
    console.log("HorseShopPage getServerSideProps");
    return {
        props: {}
    }
}
export default HorseShopPage;