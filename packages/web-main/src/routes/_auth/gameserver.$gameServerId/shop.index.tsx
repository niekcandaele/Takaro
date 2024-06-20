import { Button, Empty, EmptyPage, InfiniteScroll } from '@takaro/lib-components';
import { createFileRoute } from '@tanstack/react-router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CardList } from 'components/cards';
import { ShopListingCard } from 'components/cards/ShopListingCard';
import { gameServerSettingQueryOptions } from 'queries/setting';
import { shopListingInfiniteQueryOptions } from 'queries/shopListing';
import { Fragment } from 'react/jsx-runtime';

export const Route = createFileRoute('/_auth/gameserver/$gameServerId/shop/')({
  loader: async ({ context, params }) => {
    const [currencyName] = await Promise.all([
      context.queryClient.ensureQueryData(gameServerSettingQueryOptions('currencyName', params.gameServerId)),
    ]);

    return {
      currencyName: currencyName.value,
    };
  },
  component: Component,
});

function Component() {
  const { gameServerId } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const navigate = Route.useNavigate();

  const onCreateItemClicked = () => {
    navigate({ to: '/gameserver/$gameServerId/shop/listing/create', params: { gameServerId } });
  };

  const {
    data: shopListings,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...shopListingInfiniteQueryOptions(),
  });

  if (
    !shopListings ||
    !shopListings.pages ||
    shopListings.pages.length === 0 ||
    shopListings.pages[0].data.length === 0
  ) {
    return (
      <EmptyPage>
        <Empty
          header="No shop listings"
          description="Create a shop listing to start selling items."
          actions={[<Button onClick={onCreateItemClicked} text="Create shop listing" />]}
        />
      </EmptyPage>
    );
  }

  return (
    <Fragment>
      <Button onClick={onCreateItemClicked} text="Create shop listing" />
      <CardList>
        {shopListings.pages.map((page) =>
          page.data.map((shopListing) => (
            <ShopListingCard
              key={shopListing.id}
              currencyName={loaderData.currencyName}
              shopListingId={shopListing.id}
              gameServerId={gameServerId}
              name={shopListing.name}
              price={shopListing.price}
            />
          ))
        )}
      </CardList>
      {shopListings && shopListings.pages && (
        <InfiniteScroll
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </Fragment>
  );
}
