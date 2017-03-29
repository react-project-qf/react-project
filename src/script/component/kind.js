import React from 'react'
import MultiList from '../../component_dev/multiList/src'
import Product from './product'
import ProductMenu from './productmenu.js'
import {
    kindData
} from './kindData';

var multiData = {
    subItemType: 'ProductMenu',
    subList: kindData[0].body.categorys
};

class Kind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: multiData,
            value: [1]
        }
    }
    updateValue(value) {
        this.setState({
            value,
        })
    }
    render() {
        return (
            <div
                id="container"
                title="multiList Demo"
                className="kindList flex demo-content"
            >
                <MultiList
                    dataSource={ this.state.dataSource}
                    value={this.state.value}
                    onChange={({newValue}) => {
                        this.updateValue(newValue);
                    }}
                    onItemTap={({item})=>{
                        return [item.value];
                    }}
                    renderItem={({itemType, data, isSpread, index})=>{
                        switch (itemType){
                            case 'ProductMenu':
                                return <ProductMenu data={data} isSpread={isSpread} index={index}/>
                        }
                    }}
                    renderContent={({type}) => {
                        // console.log(type);
                        return <Product data={type} />;
                    }}

                />
            </div>
        )
    }
}
export default Kind
