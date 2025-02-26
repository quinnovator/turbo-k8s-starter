package main

import (
	"github.com/gin-gonic/gin"
	gohealth "github.com/quinnovator/turbo-k8s-starter/packages/go-health"
)

func main() {
    r := gin.Default()
    r.GET("/health", gohealth.HealthHandler())
    r.Run(":8080")
}