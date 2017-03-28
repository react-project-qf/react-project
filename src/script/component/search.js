
import React from 'react';

import multiList from '../../component_dev/list/src/';

class Search extends React.Component {

    // static guid = -1;

    // constructor() {
    //     super();
    //     this.state = {
    //         dataSource: Immutable.fromJS(dataSource.map(item => {
    //             const len = item.comment.trim().length;
    //             return {
    //                 ...item,
    //                 showMoreFlag: false,
    //                 key: ++Search.guid,
    //                 shortComment: len > 150 ? item.comment.substr(0, 150) + '...' : item.comment,
    //                 commentHasMore: len > 150 ? 1 : 0
    //             };
    //         }))
    //     };
    // }

    // // 展开/收起内容，注意这里key值发生的变化
    // toggle(item) {
    //     this.setState({
    //         dataSource: this.state.dataSource.map(it => {
    //             if (it === item) {
    //                 return it
    //                     .set('key', ++Search.guid)
    //                     .set('showMoreFlag', !it.get('showMoreFlag'));
    //             }
    //             return it;
    //         })
    //     });
    // }

    // render() {
    //     return (
    //         <Page title="Modify Height" onLeftPress={() => location.href = "./index.html"}>
    //             <List
    //                 extraClass="yo-scroller-fullscreen m-sight-comment-list"
    //                 dataSource={this.state.dataSource}
    //                 renderItem={(item) => <DemoItem data={item} toggle={() => this.toggle(item)}/>}
    //                 infinite={true}
    //                 infiniteSize={5}
    //             />
    //         </Page>
    //     );
    // }
}

export default Search
