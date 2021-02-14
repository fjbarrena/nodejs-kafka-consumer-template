# Execution

Using plain node:

```shell
node kafka-consumer.js --topic ueba --from-beginning true --group ueba-group --client ueba-client --brokers localhost:9092,localhost:9093,localhost:9094
```

Using docker image:

```shell
docker run --env TOPIC=ueba --env GROUP=ueba-group  --env CLIENT=ueba-client --env BROKERS=host.docker.internal:9092,host.docker.internal:9093,host-docker-internal:9094 --network="host" -it opossum/ueba-kafka-consumer:latest
```
