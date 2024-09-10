# outputs.tf

output "frontend_instance_public_ip" {
  description = "Public IP address of the frontend instance"
  value       = aws_instance.frontend.public_ip
}

output "backend_instance_private_ip" {
  description = "Private IP address of the backend instance"
  value       = aws_instance.backend.private_ip
}

output "db_instance_private_ip" {
  description = "Private IP address of the database instance"
  value       = aws_instance.db.private_ip
}

output "ai_instance_private_ip" {
  description = "Private IP address of the ai instance"
  value       = aws_instance.ai.private_ip
}
