"""Change todo name to tasks

Revision ID: 6f0700651706
Revises: 0e5300ed4e00
Create Date: 2023-10-29 20:49:49.573558

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '6f0700651706'
down_revision: Union[str, None] = '0e5300ed4e00'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.rename_table('todos', 'tasks')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.rename_table('tasks', 'todos')
    # ### end Alembic commands ###
