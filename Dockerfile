FROM java:8

RUN wget http://apache.spd.co.il/kafka/0.11.0.0/kafka_2.11-0.11.0.0.tgz && \
    tar -xzf kafka_2.11-0.11.0.0.tgz

WORKDIR /kafka_2.11-0.11.0.0
CMD ./bin/zookeeper-server-start.sh config/zookeeper.properties & \
    ./bin/kafka-server-start.sh config/server.properties
    
