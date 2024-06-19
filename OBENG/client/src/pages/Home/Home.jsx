import CardHor from "../../components/CardHor.jsx";
import ImageSlider from "../../components/ImageSlider.jsx";
import "./Home.scss"
import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense, useContext } from "react";

function Home(){
    const data = useLoaderData();
    return(
        <div className="homePage">
            <div className="imageslide">
                <ImageSlider/>
            </div>
            <div className="compBengkel">
                <div className="spanbengkel">
                    <h2>Recommended Workshop</h2>
                    <Link to="/list" className="lihatsemua">See all</Link>
                </div>
                <div className="bengkels">
                    <Suspense fallback={<p className="load">Loading...</p>}>
                        <Await
                        resolve={data.postResponse}
                        errorElement={<p className="load">Error loading posts!</p>}
                        >
                        {(postResponse) =>
                            postResponse.data.map((post) => (
                            <CardHor key={post.id} item={post} />
                            ))
                        }
                        </Await>
                    </Suspense>
                </div>
            </div>
            {/* <div className="compBengkel">
                <div className="spanbengkel">
                    <h2>Bengkel Rekomendasi</h2>
                    <Link to="/list" className="lihatsemua">Lihat Semua</Link>
                </div>
                <div className="bengkels">
                    {bengkel?.map(item=>(
                        <CardHor key={item.id} item={item}/>
                    ))}
                </div>
            </div> */}
        </div>
    )
}

export default Home;