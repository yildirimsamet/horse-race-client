const MyBarnPage = () => {
    return <div>My barn</div>
}
export const getServerSideProps = () =>{
    console.log("MyBarnPage getServerSideProps");
    return {
        props: {}
    }
}
export default MyBarnPage;
