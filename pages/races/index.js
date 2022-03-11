const RacesPage = () => {
    return <div>Races</div>
}
export const getServerSideProps = () =>{
    console.log("RacesPage getServerSideProps");
    return {
        props: {}
    }
}
export default RacesPage;