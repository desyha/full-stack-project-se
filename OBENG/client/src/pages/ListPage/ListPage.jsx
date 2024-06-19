import { Await, useLoaderData } from "react-router-dom";
import Card from "../../components/Card";
import Filter from "../../components/Filter";
import "./listpage.scss"
import { Suspense } from "react";

function ListPage(){
    const data = useLoaderData();
    return(
        <div className="listPage">
            <div className="bengkels">
            <Suspense fallback={<p>Loading...</p>}>
                <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
                >
                {(postResponse) =>
                    postResponse.data.map((post) => (
                    <Card key={post.id} item={post} />
                    ))
                }
                </Await>
            </Suspense>
            </div>
        </div>
    )
}

export default ListPage;