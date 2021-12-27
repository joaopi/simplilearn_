# simplilearn_scaling_ec2_cloudwatch
Simplilearn project: Scaling the EC2 Instances Based on Monitored CloudWatch Metrics

With this project, EC2 Instances serve a simulated HTTP application Hotstar, and are automatically scaled if the request count increases above a configured threshold or if the CPU load in the instances also increases above a configured threshold.

The Project is composed of a Cloud Formation Stack template that creates:
  * An autoscaling group that can scale from 1 to 3 instances
  * A Launch Configuration that creates EC2 t2.micro and starts an httpd service and creates a html page to simulate an application.
  * A Security group that allows the HTTP traffic and SSH access to the EC2 Instances
  * A Application Load Balancer, ALB Listener to port 80 and an ALB Target Group that is associated with the Auto Scaling Group
  * A Security Group that allows Internet Ingress HTTP traffic to the Application Load Balancer
  * A Scaling Policy based on the Application Load Balancer Request Count per Target metric, to simulate the number of logged users
  * Two CloudWatch Alarms that alert if EC2 instances' CPU utilization are above or below specific thresholds
  * Two additional Scaling Policy based on the CPU utilization CloudWatch Alarms, that scale up or down a EC2 instance depending on the alarm type.

The CloudFormation template is configured with the following parameters:
  * VPC Id: the Id of the Virtual Private Cloud
  * Subnets: a list of of SubnetIds in your Virtual Private Cloud (VPC)
  * KeyName: Name of an existing EC2 KeyPair to enable SSH access to the instances
  * SSHLocation: The IP address range that can be used to SSH to the EC2 instances
  * CPUPolicySCaleOutTargetValue: CPU load scaling out threshold
  * CPUPolicySCaleOutTargetValue: CPU load scaling in threshold
  * ALBRequestCountTargetValue: Request count scaling threshold
