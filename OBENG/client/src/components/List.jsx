import Card from"./Card"
import "./list.scss"

function List({posts}){
  return (
    <div className='list'>
        {posts[0]==null ? (
            <div>
            <p className="notfound">Nothing here yet</p>
            </div>
        ) : (
            <div>
                {posts.map(item=>(
                <Card key={item.id} item={item}/>
              ))}
            </div>
        )}
    </div>
  )
}

export default List