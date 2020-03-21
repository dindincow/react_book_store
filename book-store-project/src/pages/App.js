import React ,{Component}from 'react';
import Search from '../component/Search';
import Products from '../component/Products';
import PopupPanel from '../component/PopupPanel';
import Layout from '../Layout';

class App extends Component{
    render(){
        return(
            <Layout>
        
                <Search/>
                <Products/>
                <PopupPanel/>
       
            </Layout>
        )
    }
}

export default App;