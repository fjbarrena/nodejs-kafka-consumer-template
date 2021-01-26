FROM node:12.13.0-slim

WORKDIR /opt

COPY . .
RUN npm install

ENV TOPIC ""
ENV GROUP ""
ENV CLIENT ""
ENV BROKERS ""
ENV FROM_BEGINNING true

CMD ["sh", "-c", "node kafka-consumer.js --topic ${TOPIC} --from-beginning ${FROM_BEGINNING} --group ${GROUP} --client ${CLIENT} --brokers ${BROKERS}"]
