import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

interface CityWeather {
  name: string;
  weather: string;
  status: string[];
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: CityWeather[];
}

@Component({
  selector: "weather-finder",
  templateUrl: "./weatherFinder.component.html",
  styleUrls: ["./weatherFinder.component.scss"],
})
export class WeatherFinder implements OnInit {
  constructor(private httpClient: HttpClient) {}
  CityName = "";
  // cityWeather = "";
  // cityWind = "";
  // cityHumidity = "";
  // cityDetsils: {};
  isCold: boolean = false;
  isHot: boolean = false;
  showNoResult: boolean = false;
  showDetails: boolean = false;

  totalPages: any = [];
  CityWeatherDetails: CityWeather[] = [];

  ngOnInit(): void {}
  // search() {
  //   this.showNoResult = true;
  //   this.showDetails = false;
  //   if (this.CityName) {
  //     this.httpClient
  //       .get<Array<CityWeather>>(
  //         `https://jsonmock.hackerrank.com/api/weather?name=${this.CityName}`
  //       )
  //       .subscribe((res: any) => {
  //         console.log(res.data);
  //         this.cityDetsils = res.data;

  //         if (res.data.length >= 2 || res.data.length == 0) {
  //           this.showNoResult = true;
  //           this.showDetails = false;
  //         } else {
  //           this.showNoResult = false;
  //           this.showDetails = true;
  //           this.cityWeather = this.cityDetsils[0].weather;
  //           this.cityWind = this.cityDetsils[0].status[0];
  //           this.cityHumidity = this.cityDetsils[0].status[1];
  //           let m = this.cityDetsils[0].weather;

  //           let temp = m.split(" ");
  //           console.log(temp);

  //           if (temp[0] <= 20) {
  //             console.log(temp[0]);
  //             this.isCold = true;
  //             this.isHot = false;
  //           } else {
  //             this.isHot = true;
  //             this.isCold = false;
  //           }
  //         }
  //       });
  //   }
  // }

  search() {
    this.showNoResult = true;
    this.showDetails = false;
    if (this.CityName) {
      this.getCityDetails(this.CityName).subscribe((res) => {
        console.log(res);

        if (res.data.length >= 2 || res.data.length == 0) {
          this.showNoResult = true;
          this.showDetails = false;
        } else {
          this.totalPages = res.total_pages;
          console.log(this.totalPages);
          this.CityWeatherDetails = res.data;
          console.log(this.CityWeatherDetails);
          this.showDetails = true;
          this.showNoResult = false;

          let m = this.CityWeatherDetails[0].weather;

          let temp = m.split(" ");
          console.log(typeof temp);

          if (temp[0] <= 20) {
            console.log(temp[0]);
            this.isCold = true;
            this.isHot = false;
          } else {
            this.isHot = true;
            this.isCold = false;
          }
        }
      });
    }
  }

  getCityDetails(CityName: any): Observable<ApiResponse> {
    const URL = "https://jsonmock.hackerrank.com/api/weather?name=" + CityName;

    return this.httpClient.get<ApiResponse>(URL).pipe(map((data) => data));
  }
}
