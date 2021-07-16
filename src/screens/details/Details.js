import React, { useEffect } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


export default function Details(props) {

    const [movieDetails, setMovieDetails] = React.useState({
        artists: [],
        censor_board_rating: "",
        duration: 0,
        genres: [],
        id: "",
        poster_url: "",
        rating: 0,
        release_date: "",
        status: "",
        storyline: "",
        title: "",
        trailer_url: "",
        wiki_url: ""
    });
    const opts = {
        height: '390',
        width: '800',
        PlayerVars: {
            autoplay: 1
        }
    };

    const [currentRating, setCurrentRating] = React.useState();

    React.useEffect(() => {
        setCurrentRating(Math.floor(movieDetails.rating / 2));
    }, [movieDetails.rating])

    async function loadDetails() {
        const rawResponse = await fetch(props.baseUrl + "movies/" + props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        });
        const data = await rawResponse.json();
        setMovieDetails(data);
    }

    function dateString(string) {
        return new Date(string).toDateString();
    }

    const videoOnReady = (event) => {
        event.target.pauseVideo();
    }

    const rateClickHandler = (event) => {
        console.log(event.target);
    }

    useEffect(() => {
        loadDetails();
    }, []);

    return (
        <div>
            <Header baseUrl={props.baseUrl} movieid={movieDetails.id} detailButton />
            <div className="detailsPage">
                <Typography className="back">
                    <Link to={"/"}>
                        &#60; Back to Home
                    </Link>
                </Typography>
                <div className="details-container">
                    <div style={{ width: "20%", marginLeft: "10px" }}>
                        <img src={movieDetails.poster_url} alt={movieDetails.title} />
                    </div>
                    <div style={{ width: "60%" }}>
                        <Typography variant="headline" component="h2">
                            {movieDetails.title}
                        </Typography>
                        <Typography style={{ fontWeight: 600 }}>
                            Genres:
                        </Typography>{movieDetails.genres.join(", ")}
                        <Typography style={{ fontWeight: 600 }}>
                            Duration:
                        </Typography>{movieDetails.duration}
                        <Typography style={{ fontWeight: 600 }}>
                            Release Date:
                        </Typography>{dateString(movieDetails.release_date)}
                        <Typography style={{ fontWeight: 600 }}>
                            Rating:
                        </Typography>{movieDetails.rating}
                        <Typography style={{ fontWeight: 600, marginTop: "16px" }}>
                            Plot:
                        </Typography>(<a href={movieDetails.wiki_url}>Wiki Link</a>){movieDetails.storyline}
                        <Typography style={{ fontWeight: 600, marginTop: "16px" }}>
                            Trailer:
                        </Typography><YouTube videoId={movieDetails.trailer_url.split("v=")[1]} opts={opts} onReady={videoOnReady} />
                    </div>
                    <div style={{ width: "20%" }}>
                        <Typography style={{ fontWeight: 600 }}>
                            Rate this movie:
                            <div className="rating" data-rating={currentRating}>
                                {[...Array(5).keys()].map((n, index) => {
                                    let starColor = "black";
                                    if ((index + 1) <= currentRating) {
                                        starColor = "yellow";
                                    }
                                    return (
                                        <StarBorderIcon color="default" className="star" style={{ color: starColor }}
                                            onClick={() => setCurrentRating(index + 1)}
                                        />
                                    );
                                })}
                            </div>
                        </Typography>
                        <Typography style={{ fontWeight: 600, margin: "16px 0" }}>
                            Artists:
                        </Typography>
                        <GridList cols={2}>
                            {movieDetails.artists.map((artist) => (
                                <GridListTile key={artist.id}>
                                    <img src={artist.profile_url} alt="" />
                                    <GridListTileBar title={artist.first_name + " " + artist.last_name}></GridListTileBar>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>
    );
}