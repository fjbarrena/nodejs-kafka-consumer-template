# Execution

```shell
docker run --env TOPIC=ueba --env GROUP=ueba-group  --env CLIENT=ueba-client --env BROKERS=host.docker.internal:9092,host.docker.internal:9093,host-docker-internal:9094 --network="host" -it name-of-your-image:latest
```
