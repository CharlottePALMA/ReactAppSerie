import React, {Component} from 'react';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            value: '',
            idSerie: ''
        };
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
    }


    onChange(event) {
        this.setState({
            value: event.target.value
        });

        fetch('seriesList.json', {})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            });
        /*.then(function () {
            alert("j'ai fait ce que j'ai pu");
        });*/

        fetch('seriesEpisodesList.json', {})
            .then(response => response.json())
            .then(seriesListEpisodeDepuisFichier => {
                this.setState({seriesEpisodesList: seriesListEpisodeDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            });
        /*.then(function () {
            alert("j'ai fait ce que j'ai pu");
        });*/

    }


    render() {
        return (

            <div>
                <input type="text" value={this.state.value} onChange={this.onChange}/>
                <ul>
                    {this.state.value.length ?
                        this.state.seriesList.length ?
                            this.state.seriesList.filter(p =>
                                p.seriesName.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1
                            ).map(item =>
                                <li key={item.id}>{item.seriesName}
                                    <ul>
                                        {this.state.seriesEpisodesList.filter(b =>
                                            b.serie_id == item.id
                                        ).map(a =>
                                            a.episodes_list.filter(e =>
                                                e.episodeName
                                            ).map(n =>
                                                <li>{n.episodeName}</li>
                                            )

                                        )
                                        }


                                    </ul>
                                </li>
                            )

                            : <li>Loading...</li>
                        : <p>Si tu laisses le champ vide aussi...</p>


                    }

                </ul>


            </div>
        )
    }
}


export default App;
