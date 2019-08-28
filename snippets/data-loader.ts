const CollectionThingLoader = new DataLoader(
  ids =>
    this.connection.manager
        .createQueryBuilder()
        .select('collection')
        .from(Collection, 'collection')
        .where('collection.id IN (:...ids)', {
            ids,
        })
        .leftJoinAndSelect(
            'collection.things',
            'thing'
        )
        .getMany()
        .then(mapIds(ids))
        .then(pluck('things'))
)
