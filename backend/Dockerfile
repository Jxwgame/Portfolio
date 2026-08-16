# pure-Go sqlite driver (modernc.org/sqlite) — ไม่ต้อง CGO เลยไม่ต้องมี gcc/musl-dev
FROM golang:1.26-alpine AS build
WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/server ./cmd/server

FROM alpine:3.20
RUN apk add --no-cache ca-certificates
COPY --from=build /out/server /usr/local/bin/server

ENV APP_ENV=production
ENV DB_PATH=/data/portfolio.db

EXPOSE 8080
ENTRYPOINT ["server"]
