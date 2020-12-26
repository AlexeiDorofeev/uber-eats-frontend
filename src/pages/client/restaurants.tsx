import { gql, useQuery } from "@apollo/client";
import React from "react";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
          coverImg
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          placeholder="Search Restaurant"
          className="input w-3/12 rounded-md border-0"
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-md mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col group items-center cursor-pointer">
                <div
                  className="w-16 h-16 bg-cover  border-gray-600 group-hover:opacity-80"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                ></div>
                <span className="text-sm text-center font-medium mt-1">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-7 grid grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <div>
                <div
                  style={{ backgroundImage: `url(${restaurant.coverImg})` }}
                  className="bg-red-500 py-28 bg-cover bg-center mb-3"
                ></div>
                <h3 className="text-lg font-medium">{restaurant.name}</h3>
                <span className="border-t-2">{restaurant.category?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
