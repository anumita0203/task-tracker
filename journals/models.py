from django.db import models

class JournalEntry(models.Model):
    user = models.CharField(max_length=255)  # Or link to a User model
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Journal Entry by {self.user} on {self.created_at}"
