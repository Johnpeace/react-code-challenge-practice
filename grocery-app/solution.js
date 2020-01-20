/**
 * 
You have a GroceryApp class, which receives a list of products, each one with name and votes. The app should render 
an unordered list, with a list item for each product. Products can be upvoted or downvoted.

By appropriately using React state and props, implement the upvote/downvote logic. Keep the state in the topmost 
component, while the Product component should accept props.

For example, passing the following array as products prop to GroceryApp [{ name: "Oranges", votes: 0 }, 
{ name: "Bananas", votes: 0 }] and clicking the '+' button next to the Oranges should result in HTML like:

<div id="root">
  <ul>
    <li>
      <span>Oranges</span> - <span>votes: 1</span><button>+</button> <button>-</button>
    </li>
    <li>
      <span>Bananas</span> - <span>votes: 0</span><button>+</button> <button>-</button>
    </li>
  </ul>
</div>

 */

const Product = props => {
  const plus = () => props.onVote(1);
  const minus = () => props.onVote(-1);
  return (
    <li>
      <span>{props.name}</span> - <span>votes: {props.votes}</span>
      <button onClick={plus}>+</button>{" "}
      <button onClick={minus}>-</button>
    </li>
  );
};

class GroceryApp extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      products: props.products
    };
  }
 
  onVote = (dir, index) => {
    let products = [...this.state.products];
    products[index].votes += dir;
    this.setState({ products });
  };

  render() {
    return (
      <ul>
        {this.state.products.map((p, index) => <Product key={`p-${index}`} onVote={(dir) => this.onVote(dir, index)} {...p} />)}
      </ul>
    );
  }
}
document.body.innerHTML = "<div id='root'></div>";

ReactDOM.render(<GroceryApp
  products={[
    { name: "Oranges", votes: 0 },
    { name: "Apples", votes: 0 },
    { name: "Bananas", votes: 0 }
  ]}
/>, document.getElementById('root'))