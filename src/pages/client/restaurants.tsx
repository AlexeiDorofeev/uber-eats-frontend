import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
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
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Uber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
      >
        <input
          ref={register({ required: true, min: 3 })}
          name="searchTerm"
          type="Search"
          placeholder="Search Restaurant"
          className="input w-3/4 rounded-md border-0 md:w-3/12"
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8 pb-20">
          <div className="flex justify-around max-w-md mx-auto">
            {data?.allCategories.categories?.map(
              ({ id, coverImg, name, slug }) => (
                <Link to={`/category/${slug}`}>
                  <div
                    key={id}
                    className="flex flex-col group items-center cursor-pointer"
                  >
                    <div
                      className="w-16 h-16 bg-cover  border-gray-600 group-hover:opacity-80"
                      style={{ backgroundImage: `url(${coverImg})` }}
                    ></div>
                    <span className="text-sm text-center font-medium mt-1">
                      {name}
                    </span>
                  </div>
                </Link>
              )
            )}
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map(
              ({ coverImg, name, category, id }) => (
                <Restaurant
                  key={id}
                  id={id + ""}
                  coverImg={coverImg}
                  name={name}
                  categoryName={category?.name}
                />
              )
            )}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div />
            )}
            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
