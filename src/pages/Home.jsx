import Categoryfilter from "../components/Product/Categoryfilter";
import Brandfilter from "../components/Product/Brandfilter";
import Productcard from "../components/Product/Productcard";

const Home = () => {
  

  const products = [];



  return (
    
    <main className="container py-4">

      <div className="row">

        <aside className="col-lg-3">

          <Categoryfilter />

          <Brandfilter/>

        </aside>

       <section className="col-lg-9">

    <div className="row g-4">
      <Productcard/>

        

    </div>

</section>

      </div>

    </main>
  );
};

export default Home;