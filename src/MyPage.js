import React, { Component } from 'react'
import Navigation from './Navigation'
import Header from './Header'

class MainFeed extends Component {
	render() {
		return (
            <>
                <Navigation></Navigation>
                <div class="container">
                    <Header>This is your page</Header>
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Date created</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row"><a href="#">This Week in Movies and Music</a></th>
                                <td><a href="#">Luis J.</a></td>
                                <td>February 14, 2020</td>
                            </tr>
                            <tr>
                                <th scope="row"><a href="#">The Healthiest Fruits</a></th>
                                <td><a href="#">Harry H.</a></td>
                                <td>July 24, 2019</td>
                            </tr>
                            <tr>
                                <th scope="row"><a href="#">How to Figure Skate</a></th>
                                <td><a href="#">Megan B.</a></td>
                                <td>April 5, 2019</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>



		);
	}
}

export default MainFeed