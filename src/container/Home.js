import React, { Component } from 'react';
// import {Redirect} from 'react-router-dom'; 
import direction from '../assets/images/direction.png';
import truck from '../assets/images/truck.png';
import truckimg from '../assets/images/truck_img.png';
import car from '../assets/images/car.png';
import rider from '../assets/images/rider.png';
import routestart from '../assets/images/route-start.svg';
import routedrive from '../assets/images/route-drive.svg';
import routestop from '../assets/images/route-stop.svg';
import MyMap from '../component/MyMap';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import { api_url } from '../Config';
import swal from 'sweetalert';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
      base_url: api_url.base_url,
      loading: false,
      order_id: '',
      orderData: [],
      historyData: [],
      idErr: '',
      track_no: '',
      site_logo: '',
      company_name: '',
    };
    let lang_name = localStorage.getItem('lang_name');
    if (lang_name == null) {
      localStorage.setItem('lang', JSON.stringify(this.state.arabic));
      localStorage.setItem('lang_name', 'arabic');
    }

    this.onChange = this.onChange.bind(this);
    this.getShipmentDetails = this.getShipmentDetails.bind(this);
    var api_rul_info = this.state.base_url + 'api.php?type=get_site_info';
    fetch(api_rul_info)
      .then(res => res.json())
      .then(result => {
        if (result.response == 1) {
          this.setState({
            site_logo: result.site_logo,
            company_name: result.company_name
          })

        }
      })
  }
  componentDidMount() {

  $(document).ready(function(){
    
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    })

})


$(".sideicon").click(function(){
    $(".sidebar").fadeIn();
});
$(".routing_head h4 i").click(function(){
    $(".sidebar").fadeOut();
});





  }
  getShipmentDetails(e) {
    e.preventDefault();
    if (this.state.order_id === '') {
      this.setState({
        idErr: 'Please enter Track No.'
      })
    } else {

      this.setState({ loading: true })

      const sendData = {
        track_no: this.state.order_id
      }
      const trackURL = this.state.base_url + 'api.php?type=track_shipments';
      fetch(trackURL,
        {
          method: 'POST',
          headers:
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData)
        })
        .then((response) => response.json())
        .then(result => {
          if (result.response === 1) {
            this.setState({
              orderData: result.result,
              historyData: result.history,
              track_no: result.result[0].order_detail.track_no

            }, () => {
              this.setState({ redirectToReferrer: true })
            });
          } else {
            swal('No Record Found.');
          }
          this.setState({ loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let lang_name = localStorage.getItem('lang_name');
    if (lang_name == null) {
      localStorage.setItem('lang', JSON.stringify(this.state.arabic));
      localStorage.setItem('lang_name', 'arabic');
    }
    const lang = JSON.parse(localStorage.getItem("lang")) ? JSON.parse(localStorage.getItem("lang")) : [];
    const { loading } = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={`/track-detail/${this.state.track_no}`}
      />)
    }
    if (localStorage.getItem('customer_id') > 0) {
      return (<Redirect to='dashboard' />)
    }
    return (

      <React.Fragment>
        <div class="sideicon">
    <img src={direction} alt="" />
</div>


<section class="topbar">
    <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-5 sidegapp map_data">
            <ul>
                <li><a Link to="#"><i class="feather icon-map-pin"></i> Map</a></li>
                <li><a Link to="#"><i class="feather icon-list"></i> Data</a></li>
                <li><a Link to="#"><i class="feather icon-refresh-ccw"></i> Undo</a></li>
            </ul>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-5 sidegapp middle_head">
            <h4><b>EloERP</b> Location Service</h4>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-2 sidegapp map_data right_bar">
            <ul>
                <li><a Link to="#"><i class="feather icon-map-pin"></i> </a></li>
                <li><a Link to="#"><i class="feather icon-user-plus"></i> </a></li>
            </ul>
        </div>
    </div>
</section>


<div class="row">
    <div class="col-lg-3 col-md-4 sidegapp sidebar">

        <div class="routing_head">
            <h4> Routing Directions <i class="feather icon-x"></i></h4>
        </div>
        <div class="tabs_box">
            <ul class="tabs">
                <li class="tab-link current" data-tab="tab-1">Live</li><li class="tab-link" data-tab="tab-2">History</li>
            </ul>

            <div id="tab-1" class="tab-content current">
                <div class="widget_categories">
                    <div class="date_selector">
                        <div class="row">
                            <div class="col-lg-6 search_Bar">
                                <i class="feather icon-search"></i>
                                <input type="text" placeholder="Search" name="" />
                            </div>
                            <div class="col-lg-6 input_Bar">
                                <input type="date" name="" />
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <a Link to="#">
                                <div class="form-group">
                                  <input type="checkbox" id="Rider1"/>
                                  <label for="Rider1"><img src={truck} alt="" /> Truck <span> 2022-01-22 07:18:04</span></label>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a Link to="#">
                                <div class="form-group">
                                  <input type="checkbox" id="Rider2"/>
                                  <label for="Rider2"><img src={truck} alt="" /> Car <span>2022-01-22 07:21:47</span></label>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a Link to="#">
                                <div class="form-group">
                                  <input type="checkbox" id="Rider3"/>
                                  <label for="Rider3"><img src={truckimg} alt="" /> Bus <span>2022-01-22 07:21:54</span></label>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a Link to="#">
                                <div class="form-group">
                                  <input type="checkbox" id="Rider4"/>
                                  <label for="Rider4"><img src={truck} alt="" /> Car <span>2022-01-22 07:18:04</span></label>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a Link to="#">
                                <div class="form-group">
                                  <input type="checkbox" id="Rider5"/>
                                  <label for="Rider5"><img src={truckimg} alt="" /> Bus <span>2022-01-22 07:21:47</span></label>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a Link to="#">
                                <div class="form-group">
                                  <input type="checkbox" id="Rider6"/>
                                  <label for="Rider6"><img src={truck} alt="" /> Car <span>2022-01-22 07:18:04</span></label>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a Link to="#">
                                <div class="form-group">
                                  <input type="checkbox" id="Rider7"/>
                                  <label for="Rider7"><img src={truckimg} alt="" /> Bus <span>2022-01-22 07:18:04</span></label>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a Link to="#">
                                <div class="form-group">
                                  <input type="checkbox" id="Rider8"/>
                                  <label for="Rider8"><img src={car} alt="" /> Car <span>2022-01-22 07:18:04</span></label>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="tab-2" class="tab-content">
                <div class="widget_categories">
                    <div class="date_selector">
                        <div class="row">
                            <div class="col-lg-6 search_Bar">
                                <i class="feather icon-search"></i>
                                <input type="text" placeholder="Search" name="" />
                            </div>
                            <div class="col-lg-6 input_Bar">
                                <input type="date" name="" />
                            </div>
                        </div>
                    </div>
                    <div class="row from_to_time">
                        <div class="col-lg-3 sidegapp time_head">
                            <p>Time from</p>
                        </div>
                        <div class="col-lg-9 sidegapp">
                            <div class="row ">
                                <div class="col-lg-6 col-md-6 datepiker date_picker">
                                    <input type="date" name="" />
                                </div>
                                <div class="col-lg-3 col-md-3 sidegapp datepiker">
                                    <select>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 col-md-3 datepiker" id="date_select">
                                    <select>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>30</option>
                                        <option>31</option>
                                        <option>32</option>
                                        <option>33</option>
                                        <option>34</option>
                                        <option>35</option>
                                        <option>36</option>
                                        <option>37</option>
                                        <option>38</option>
                                        <option>39</option>
                                        <option>40</option>
                                        <option>41</option>
                                        <option>42</option>
                                        <option>43</option>
                                        <option>44</option>
                                        <option>45</option>
                                        <option>46</option>
                                        <option>47</option>
                                        <option>48</option>
                                        <option>49</option>
                                        <option>50</option>
                                        <option>51</option>
                                        <option>52</option>
                                        <option>53</option>
                                        <option>54</option>
                                        <option>55</option>
                                        <option>56</option>
                                        <option>57</option>
                                        <option>58</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row from_to_time">
                        <div class="col-lg-3 sidegapp time_head">
                            <p>Time To</p>
                        </div>
                        <div class="col-lg-9 sidegapp">
                            <div class="row ">
                                <div class="col-lg-6 col-md-6 datepiker date_picker">
                                    <input type="date" name="" />
                                </div>
                                <div class="col-lg-3 col-md-3 sidegapp datepiker">
                                    <select>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                    </select>
                                </div>
                                <div class="col-lg-3 col-md-3 datepiker" id="date_select">
                                    <select>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>30</option>
                                        <option>31</option>
                                        <option>32</option>
                                        <option>33</option>
                                        <option>34</option>
                                        <option>35</option>
                                        <option>36</option>
                                        <option>37</option>
                                        <option>38</option>
                                        <option>39</option>
                                        <option>40</option>
                                        <option>41</option>
                                        <option>42</option>
                                        <option>43</option>
                                        <option>44</option>
                                        <option>45</option>
                                        <option>46</option>
                                        <option>47</option>
                                        <option>48</option>
                                        <option>49</option>
                                        <option>50</option>
                                        <option>51</option>
                                        <option>52</option>
                                        <option>53</option>
                                        <option>54</option>
                                        <option>55</option>
                                        <option>56</option>
                                        <option>57</option>
                                        <option>58</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="info_show">
                        <table class="tablebox">
                          <tr>
                            <th>Time</th>
                            <th>Information</th>
                          </tr>
                          <tr>
                            <td colspan="12"><img src={routestart} alt="" /> 2022-01-22 01:07:03  </td>
                          </tr>
                          <tr>
                            <td colspan="12"><img src={routedrive} alt="" /> 2022-01-22 01:07:03  4 min 45 s  </td>
                          </tr>
                          <tr>
                            <td colspan="12"><img src={routestop} alt="" /> 2022-01-22 01:11:48  6 min 18 s  </td>
                          </tr>

                          <tr>
                            <td colspan="12"><img src={routestart} alt="" /> 2022-01-22 01:18:06  38 min 0 s  </td>
                          </tr>
                          <tr>
                            <td colspan="12"><img src={routedrive} alt="" /> 2022-01-22 01:07:03  </td>
                          </tr>
                          <tr>
                            <td colspan="12"><img src={routestop} alt="" /> 2022-01-22 01:11:48  6 min 18 s  </td>
                          </tr>
                          <tr>
                            <td colspan="12"><img src={routedrive} alt="" /> 2022-01-22 01:07:03  4 min 45 s  </td>
                          </tr>
                          <tr>
                            <td colspan="12"><img src={routestop} alt="" /> 2022-01-22 01:11:48  6 min 18 s  </td>
                          </tr>

                          <tr>
                            <td colspan="12"><img src={routestart} alt="" /> 2022-01-22 01:18:06  38 min 0 s  </td>
                          </tr>
                          <tr>
                            <td colspan="12"><img src={routedrive} alt="" /> 2022-01-22 01:07:03  4 min 45 s  </td>
                          </tr>

                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-9 col-md-8 sidegapp">
        <div class="mapbox">
            <MyMap />
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3373.009121661994!2d72.27803311450427!3d32.28473271623095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39213c4da5255709%3A0xd3d79b51db35823c!2sIT%20Vision%20(Private)%20Limited!5e0!3m2!1sen!2s!4v1642746109654!5m2!1sen!2s" width="100%" height="100vh"  allowfullscreen="" loading="lazy"></iframe> */}
            <div class="rider_bike">
                <img src={rider} alt="" />
            </div>
            <div class="rider_bike_1">
                <img src={rider} alt="" />
            </div>
            <div class="rider_bike_2">
                <img src={rider} alt="" />
            </div>
        </div>
    </div>
</div>
      </React.Fragment>
    )
  }
}
export default Home;
