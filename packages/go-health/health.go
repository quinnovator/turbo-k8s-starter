package gohealth

import (
    "github.com/gin-gonic/gin"
    "github.com/shirou/gopsutil/v3/mem"
    "github.com/shirou/gopsutil/v3/cpu"
)

func HealthHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        v, _ := mem.VirtualMemory()
        cpuTimes, _ := cpu.Times(false)
        c.JSON(200, gin.H{
            "status":       "OK",
            "memory_usage": v,
            "cpu_usage":    cpuTimes,
        })
    }
}