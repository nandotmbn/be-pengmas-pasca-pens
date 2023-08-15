/* eslint-disable @typescript-eslint/no-explicit-any */
import { City, Province } from '../models';
import PROVINCE_AND_CITY from './indonesian_province_with_cities.json';

const provinceAndCitiesInit = () => {
  PROVINCE_AND_CITY.forEach(async (province: any) => {
    const isProvinceExists = await Province.findOne({ provinceName: province.name });
    if (isProvinceExists) {
      console.log(`[db_init]: Province with given name ${province.name} is already exists`);
    }

    const newProvince = new Province({
      provinceName: province.name,
      latitude: province.latitude,
      longitude: province.longitude
    });

    const savedProvince = await newProvince.save();

    province.cities.forEach(async (cities: any) => {
      const isCityExist = await City.findOne({ provinceName: cities.name, provinceId: savedProvince._id });
      if (isCityExist) {
        return console.log(`[db_init]: City with given name ${cities.name} is already exists`);
      }

      const newProvince = new City({
        cityName: cities.name,
        latitude: cities.latitude,
        longitude: cities.longitude,
        provinceId: savedProvince._id
      });

      const savedCity = await newProvince.save();

      return savedCity;
    });
  });
};

export { provinceAndCitiesInit };
