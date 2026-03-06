package middleware

import "github.com/gin-gonic/gin"

// Auth validates the JWT from the Authorization header.
func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Validate Cognito JWT
		c.Next()
	}
}
