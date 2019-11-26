// BB7GVKBS5NX2R5KI
// monthly: https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=VTI&apikey=BB7GVKBS5NX2R5KI
// weekly: https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=VTI&apikey=BB7GVKBS5NX2R5KI
// daily: https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=VTI&apikey=BB7GVKBS5NX2R5KI
// full intraday https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&outputsize=full&apikey=demo
import React from 'react';


class Stock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
           monthly: {},
           dailyValues:[],
           min:0,
           max:0,
           avg:0
        };
    }

    componentDidMount() {
        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&outputsize=full&apikey=demo")
          .then(response => response.json())
          .then(data => this.setState({ monthly: data }));
    }

    yoshi() {
        console.log(this.state.monthly);
        let keyList = Object.keys(this.state.monthly["Time Series (5min)"]);
        let x = [];
        console.log(keyList);
        console.log(this.state.monthly["Time Series (5min)"][keyList[2]]["4. close"]);
        for (let i=0;i<keyList.length;i++) {
            x.push([parseFloat(this.state.monthly["Time Series (5min)"][keyList[i]]["4. close"]),keyList[i]]);
        }
        let recent100 = x[0].slice(0,100);
        var sum = 0;
        for (var i=0;i<recent100.length;i++) {
            sum += recent100[0][i];
        }
        var avg = sum/recent100.length;
        var max = Math.max(...recent100);
        var min = Math.min(...recent100);
        this.setState({
            dailyValues: x,
            avg:avg,
            max:max,
            min:min
        })
    }

    printDV() {
        console.log(this.state.dailyValues);
    }

    largest(x) {
        // return max price of last x values
        
    }

    renderTableData() {
        return this.state.dailyValues.map((price, index) => {
           return (
              <tr key={index}>
                 <td>{price[1]}</td>
                 <td>{price[0]}</td>
              </tr>
           )
        })
     }

    render() {
      return (
        <div>
            Testerino
            Max: {this.state.max}
            Min: {this.state.min}
            Avg: {this.state.avg}
            <button onClick={this.yoshi.bind(this)}>Click</button>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Price</th>
                    </tr>
                    {this.renderTableData()}
                </tbody>
            </table>
        </div>
      );
    }
}

export default Stock