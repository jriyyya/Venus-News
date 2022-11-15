import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category:'general'
  }
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading:false,
      page:1
    };
  }


  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7ae808e116954f78ab3dc902e5992a23&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles,totalResults: parsedData.totalResults, loading:false
    });
  }
  
  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7ae808e116954f78ab3dc902e5992a23&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    });
  };

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7ae808e116954f78ab3dc902e5992a23&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
  };

  render() {
    return (
      <div className="container my-3">
        
        <h1 className="text-center my-1">Venus News-Top headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((e) => {
            return (
              <div className="col-md-4" key={e.url}>
                <Newsitem
                  title={e.title ? e.title : ""}
                  description={e.description ? e.description: ""}
                  imageUrl={e.urlToImage}
                  newsUrl={e.url}
                  author={e.author}
                  date={e.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark btn-sm mx-1"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
          disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)}
            className="btn btn-dark btn-sm mx-1"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
